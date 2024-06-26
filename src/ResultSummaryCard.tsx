import { PieChart } from "@mui/x-charts"
import * as dayjs from 'dayjs'

import { QuestionResult } from "./types"

const resultSummaryStyle: any = {
  height: '130px',
  marginBottom: '10px',
  backgroundColor: '#c1fbc5',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start'
}

const resultSummaryChartStyle: any = {
  height: '100%',
  width: '30%'
}

export const resultSummaryStatsStyle: any = {
  flex: '1 1 auto',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}

export const statTextStyle: any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
}

export const textStyle: any = {
  color: '#3eb489',
  padding: '10px',
  paddingRight: '20px',
  fontSize: '25px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
}

export const smallerTextStyle = {
  ...textStyle,
  fontSize: '20px'
}

export const warningTextStyle: any = {
  ...textStyle,
  color: '#FF5F15'
}

export const smallerWarningTextStyle = {
  ...warningTextStyle,
  fontSize: '20px'
}

export const dateContainerStyle: any = {
  display: 'flex',
  justifyContent: 'flex-end',
  paddingRight: '10px'
}

export const dateStyle = {
  color: '#b6ffbb',
  fontSize: '15px'
}

interface props {
  testId?: number
  testSet: QuestionResult[]
  onClick?: (testId: any) => void
  date?: Date
}

export const ResultSummaryCard = ({ testId, testSet, onClick, date }: props) => {
  const noOfCorrect = testSet.filter(i => i.isCorrect).length
  const noOfIncorrect = testSet.filter(i => !i.isCorrect).length

  return (
    <div>
      <div style={dateContainerStyle}>
        {date && <span style={dateStyle}>{dayjs(date).format('DD-MM-YY HH:mm')}</span>}
      </div>
      <div style={resultSummaryStyle} onClick={() => onClick(testId)}>
        <div style={resultSummaryChartStyle}>
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: noOfCorrect, color: '#3eb489' },
                  { id: 1, value: noOfIncorrect, color: '#FF5F15' }
                ],
                innerRadius: 15,
                outerRadius: 35,
                paddingAngle: 5,
                cornerRadius: 5,
                cy: 60,
                cx: 40
              }
            ]}
            width={100}
            height={100}
          />
        </div>
        <div style={resultSummaryStatsStyle}>
          <div style={statTextStyle}>
            <div style={textStyle}>
              Correct <b>{noOfCorrect}</b>
            </div>
            <div style={warningTextStyle}>
              Incorrect <b>{noOfIncorrect}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}