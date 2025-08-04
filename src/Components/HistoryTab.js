import { useState } from 'react';
import {  Nav, Row, Col, Card } from 'react-bootstrap';
import { HistoryData } from "../HistoryData";


function History() {
  const [activeYear, setActiveYear] = useState(HistoryData[0].year);
  const currentYearData = HistoryData.find(item => item.year === activeYear);
  const months = currentYearData ? Object.keys(currentYearData.months) : [];
  const [activeMonth, setActiveMonth] = useState(months[0]);

  return (
     <div className="container mt-4">
      <h2>연도별 히스토리</h2>

      <Nav variant="tabs" activeKey={activeYear} onSelect={(k) => {
        setActiveYear(Number(k));
        const newYear = HistoryData.find(h => h.year === Number(k));
        const newMonths = Object.keys(newYear.months);
        setActiveMonth(newMonths[0]);
      }}>
        {HistoryData.map((item) => (
          <Nav.Item key={item.year}>
            <Nav.Link eventKey={item.year}>{item.year}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Nav variant="pills" className="my-3" activeKey={activeMonth} onSelect={(k) => setActiveMonth(k)}>
        {months.map((month) => (
          <Nav.Item key={month}>
            <Nav.Link eventKey={month}>{month.toUpperCase()}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Row>
        {currentYearData?.months[activeMonth]?.map((item, idx) => (
          <Col md={6} key={idx}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{item.day}일</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default History;