import React from 'react';
import styles from './FloatingList.module.css';

function FloatingList() {
  return (
    <section class={styles.sub_wrap}>
      <h2>서울시 유동인구 수</h2>
      <table class={styles.table_ty1}>
        <tr>
          <th>ROW</th>
          <th>일자</th>
          <th>시간</th>
          <th>연령대</th>
          <th>성별</th>
          <th>시</th>
          <th>군구</th>
          <th>유동인구수</th>
        </tr>
        <tr>
          <td>1</td>
          <td>20190203</td>
          <td>00</td>
          <td>40</td>
          <td>여성</td>
          <td>서울</td>
          <td>영등포구</td>
          <td>2392</td>
        </tr>
      </table>
    </section>
  );
}

export default FloatingList;
