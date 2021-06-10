import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './FloatingList.module.css';

const API_KEY = process.env.REACT_APP_API_KEY;

function FloatingList() {
  const [result, setResult] = useState([]);

  const fetchLists = () => {
    axios
      .get(
        `http://openapi.seoul.go.kr:8088/${API_KEY}/json/Corona19Status/1/30/`
      )
      .then((response) => {
        const data = response.data.Corona19Status.row;
        setResult(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchLists();
    // eslint-disable-next-line
  }, []);

  return (
    <section className={styles.sub_wrap}>
      <h2>서울시 코로나19 확진자 현황</h2>
      <table className={styles.table_ty1}>
        <colgroup>
          <col width='15%' />
          <col width='20%' />
          <col width='15%' />
          <col width='30%' />
          <col width='20%' />
        </colgroup>
        <thead>
          <tr>
            <th>확진번호</th>
            <th>확진일시</th>
            <th>거주구역</th>
            <th>감염경로</th>
            <th>여행이력</th>
          </tr>
        </thead>
        <tbody>
          {result.map((item) => {
            return (
              <tr key={item.CORONA19_ID}>
                <td>{item.CORONA19_ID}</td>
                <td>{item.CORONA19_DATE}</td>
                <td>{item.CORONA19_AREA}</td>
                <td>{item.CORONA19_CONTACT_HISTORY}</td>
                <td>{item.CORONA19_TRAVEL_HISTORY}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default FloatingList;
