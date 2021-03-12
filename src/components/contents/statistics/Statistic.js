import React, { Component } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import axios from 'axios';
import styles from './Statistic.module.css';

class Statistic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmedData: {
        labels: ['1월', '2월', '3월'],
        datasets: [
          {
            label: '국내 누적 확진자',
            backgroundColor: 'salmon',
            fill: true,
            data: [0, 0, 0],
          },
        ],
      },
      quarantinedData: {
        labels: ['1월', '2월', '3월'],
        datasets: [
          {
            label: '월별 격리자 현황',
            backgroundColor: 'salmon',
            fill: true,
            data: [0, 0, 0],
          },
        ],
      },
      comparedData: {
        labels: ['확진자', '격리해제', '사망자'],
        datasets: [
          {
            label: '확진,해제,사망 비율',
            backgroundColor: ['#f9de59', '#e8a628', '#719a0a'],
            boarderColor: ['#f9de59', '#e8a628', '#719a0a'],
            fill: false,
            data: [0, 0, 0],
          },
        ],
      },
      dailyData: {
        labels: ['1월', '2월', '3월'],
        datasets: [
          {
            label: '일별 확진자',
            backgroundColor: '#e8a628',
            fill: true,
            data: [0, 0, 0],
          },
        ],
      },
    };
  }

  componentDidMount() {
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

    const getDailyData = async () => {
      // API 요청
      try {
        const dayOne = await axios.get(
          'https://api.covid19api.com/total/dayone/country/kr'
        );
        makeDataForDay(dayOne.data);
      } catch (error) {
        console.log(error);
      }
    };

    // 일자별 데이터 이용
    const makeDataForDay = (items) => {
      const currentConfirmed = [];
      const arr = items.slice(items.length - 11);
      // 현재 날짜를 제일 앞에 놓도록 순서 변경
      const reverse = arr.reverse();
      const dailyConfirmed = reverse.reduce((acc, cur) => {
        // 확진자 데이터
        const confirmed = cur.Confirmed;

        // 빈배열이면 현재 누적 확진자수를 넣는다
        if (currentConfirmed.length === 0) {
          currentConfirmed.push(confirmed);
        } else if (currentConfirmed.length > 0) {
          // 빈 배열이 아니라면 계산
          // 특정날짜의 누적 확진자 - 이전날짜의 누적 확진자 = 이전 날짜의 확진자 수
          const temp = currentConfirmed[0] - confirmed;
          // 이전 날짜 확진자수를 저장
          acc.push(temp);
          // 현재 누적 확진자수를 이전 날짜 누적 확진자수로 교체
          currentConfirmed.splice(0, 1, confirmed);
        }
        return acc;
      }, []);
      // 전체 데이터 순서 변경
      dailyConfirmed.reverse();

      // 현재 날짜 월 / 일 계산
      const date = new Date();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      // 현재날짜부터 10일 전까지 계산
      const dayLabels = [];
      for (let i = 10; i > 0; i--) {
        dayLabels.push(`${month}월 ${day - i}일`);
      }

      this.setState({
        dailyData: {
          labels: dayLabels,
          datasets: [
            {
              label: '일별 확진자',
              backgroundColor: '#e8a628',
              fill: true,
              data: dailyConfirmed,
            },
          ],
        },
      });
    };

    // 누적 데이터 이용
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

        // 각 월별 마지막날 데이터 수집
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
        return acc;
      }, []);

      // 2021년 데이터만 추출
      const newArr = arr.filter((a) => {
        return a.year === new Date().getFullYear();
      });

      // 마지막달 데이터 추출
      const last = newArr[newArr.length - 1];

      this.setState({
        confirmedData: {
          datasets: [
            {
              label: '국내 누적 확진자',
              backgroundColor: 'salmon',
              fill: true,
              data: newArr.map((a) => a.confirmed),
            },
          ],
        },
        quarantinedData: {
          datasets: [
            {
              label: '월별 격리자 현황',
              borderColor: 'salmon',
              fill: false,
              data: newArr.map((a) => a.active),
            },
          ],
        },
        comparedData: {
          datasets: [
            {
              label: '확진,해제,사망 비율',
              backgroundColor: ['#f9de59', '#e8a628', '#719a0a'],
              boarderColor: ['#f9de59', '#e8a628', '#719a0a'],
              fill: false,
              data: [last.confirmed, last.recovered, last.death],
            },
          ],
        },
      });
    };

    getData();
    getDailyData();
  }

  render() {
    return (
      <section>
        <h2 className={styles.head}>국내 코로나 현황</h2>
        <div className={styles.Statistics}>
          <div className={styles.Bar}>
            <Bar
              data={this.state.confirmedData}
              options={
                ({
                  title: {
                    display: true,
                    text: '국내 확진자 추이',
                    fontSize: 20,
                  },
                },
                {
                  legend: { display: true, position: 'bottom' },
                })
              }
            ></Bar>
          </div>
          <div className={styles.Line}>
            <Line
              data={this.state.quarantinedData}
              options={
                ({
                  title: {
                    display: true,
                    text: '월별 격리자 현황',
                    fontSize: 20,
                  },
                },
                {
                  legend: { display: true, position: 'bottom' },
                })
              }
            ></Line>
          </div>
          <div className={styles.Doughnut}>
            <Doughnut
              data={this.state.comparedData}
              options={
                ({
                  title: {
                    display: true,
                    text: `확진자, 격리해제, 사망자 비율 (${
                      new Date().getMonth() + 1
                    }월)`,
                    fontSize: 20,
                  },
                },
                {
                  legend: { display: true, position: 'bottom' },
                })
              }
            ></Doughnut>
          </div>
          <div className={styles.Bar}>
            <Bar
              data={this.state.dailyData}
              options={
                ({
                  title: {
                    display: true,
                    text: '일자별 확진자 추이',
                    fontSize: 20,
                  },
                },
                {
                  legend: { display: true, position: 'bottom' },
                })
              }
            ></Bar>
          </div>
        </div>
      </section>
    );
  }
}

export default Statistic;
