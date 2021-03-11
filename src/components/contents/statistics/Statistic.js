import React, { Component } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';

class Statistic extends Component {
  state = {
    monthlyData: {
      labels: ['1월', '2월', '3월'],
      datasets: [
        {
          label: '국내 누적 확진자',
          backgroundColor: 'salmon',
          fill: true,
          data: [22315, 44442, 55523],
        },
      ],
    },
  };

  componentDidUpdate() {
    // API 요청
    const getData = async () => {
      try {
        const res = await axios.get(
          'https://api.covid19api.com/total/dayone/country/kr'
        );
        makeData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const makeData = (items) => {
      const arr = items.reduce((acc, cur) => {
        // 날짜 구하기
        const currentDate = new Date(cur.Date);
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const date = currentDate.getDate();

        // 확진자 데이터
        const confirmed = cur.Confirmed;
        const active = cur.Active;
        const death = cur.Deaths;
        const recovered = cur.Recovered;

        //
        const findItem = acc.find(
          (temp) => temp.year === year && temp.month === month
        );
        if (!findItem) {
          acc.push({
            year,
            month,
            date,
            confirmed,
            active,
            death,
            recovered,
          });
        }
        if (findItem && findItem.date < date) {
          findItem.active = active;
          findItem.death = death;
          findItem.recovered = recovered;
          findItem.confirmed = confirmed;
          findItem.year = year;
          findItem.month = month;
          findItem.day = date;
        }
        // console.log(acc);
        return acc;
      }, []);

      // 2021년 데이터만 추출
      const newArr = arr.filter((a) => {
        return a.year === 2021;
      });

      this.setState({
        datasets: [{ data: newArr.map((a) => a.confirmed) }],
      });
    };

    getData();
  }

  render() {
    return (
      <div>
        <h2>국내 코로나 현황</h2>
        <Bar
          data={this.state.monthlyData}
          options={
            ({
              title: { display: true, text: '국내 확진자 추이', fontSize: 16 },
            },
            {
              legend: { display: true, position: 'bottom' },
            })
          }
        ></Bar>
      </div>
    );
  }
}

export default Statistic;
