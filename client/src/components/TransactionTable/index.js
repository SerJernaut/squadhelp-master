import * as React from "react";
import styles from "./TransactionTable.module.scss";

const transactions = [
  {
    id: 1,
    earnedOrSpent: "Заработал",
    amount: "+350$",
  },
  {
    id: 2,
    earnedOrSpent: "Потратил",
    amount: "-350$",
  },
];

const TransactionTable = (props) => {
  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>заработанные/потраченные</th>
            <th>сумма</th>
          </tr>
        </thead>
        {transactions.map((transaction) => {
          return (
            <tr>
              <td>{`${transaction.id}`}</td>
              <td>{`${transaction.earnedOrSpent}`}</td>
              <td>{`${transaction.amount}`}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default TransactionTable;
