import React, { FC, useEffect } from 'react';

import { useSelector, actions, useDispatch } from '../store';
import useQuery from '../hooks/useQuery';
import useAPI from '../hooks/useAPI';

import './Data.scss';
import { Transaction } from '../types';

const Data: FC = () => {
  const dispatch = useDispatch();
  const { query, setQuery } = useQuery();
  const { loadData } = useAPI();

  const data = useSelector((state) => state.transactions);
  const page = query.page;
  const fetchedData = loadData(page);

  useEffect(() => {
    if (page === '0') {
      dispatch(actions.set({ transactions: {} }));
      fetchedData.then((transactions) => {
        if (transactions) {
          dispatch(actions.set({ transactions }));
        }
      });
    }
  }, [dispatch, page, query]);

  async function loadMoreData() {
    setQuery({ page: `${parseInt(page) + 1}` });

    const transactions = await fetchedData;
    if (transactions) {
      dispatch(actions.addTransactions({ transactions }));
    }
  }

  function deleteTransaction(id: string) {
    dispatch(actions.deleteTransaction({ id }));
  }

  const jsxData = Object.values(data).map((transaction: Transaction): React.ReactElement => {
    return (
      <div key={transaction.id} style={{ marginBottom: '2px' }}>
        <button onClick={() => deleteTransaction(transaction.id)}>Delete this transaction</button>
        <span>id: {transaction.id}</span>
        <span>from: {transaction.from}</span>
        <span>to: {transaction.to}</span>
        <span>amount: {transaction.amount}</span>
        <span>token: {transaction.token}</span>
        <span>tokenName: {transaction.tokenName}</span>
      </div>
    );
  });

  return (
    <main className="Data">
      <div className="displayed-data">{jsxData}</div>
      <div>
        <button onClick={async () => loadMoreData()}>Load more data</button>
      </div>
    </main>
  );
};

export default Data;
