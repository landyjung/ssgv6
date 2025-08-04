import { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const Reservation = () => {
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 로컬스토리지에서 예약 데이터 읽기
    const savedReservation = localStorage.getItem('baseballReservation');
    if (savedReservation) {
      try {
        const data = JSON.parse(savedReservation);
        setReservationData(data);
      } catch (error) {
        console.error('예약 데이터를 불러오는 중 오류 발생:', error);
      }
    }
    setLoading(false);
  }, []);

  const formatDate = (dateObj) => {
    if (!dateObj) return '';
    return `${dateObj.year}년 ${dateObj.month}월 ${dateObj.day}일`;
  };

  const getDayOfWeek = (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    return days[date.getDay()];
  };

  const styles = `
    .reservation-container {
      margin-top:200px;
      max-width: 600px;
      margin: 0 auto;
      padding: 24px;
      background: white;
      min-height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 32px;
      padding-bottom: 24px;
      border-bottom: 2px solid #e5e7eb;
    }

    .header h1 {
      font-size: 28px;
      font-weight: bold;
      color: #1f2937;
      margin: 0 0 8px 0;
    }

    .header p {
      color: #6b7280;
      font-size: 16px;
      margin: 0;
    }

    .reservation-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .date-section {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
    }

    .date-icon {
      width: 48px;
      height: 48px;
      background: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .date-info {
      flex: 1;
    }

    .date-main {
      font-size: 24px;
      font-weight: bold;
      color: #1f2937;
      margin: 0 0 4px 0;
    }

    .date-sub {
      font-size: 16px;
      color: #6b7280;
      margin: 0;
    }

    .game-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .detail-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }

    .detail-icon {
      width: 20px;
      height: 20px;
      color: #6b7280;
    }

    .detail-content {
      flex: 1;
    }

    .detail-label {
      font-size: 12px;
      color: #9ca3af;
      margin: 0 0 4px 0;
    }

    .detail-value {
      font-size: 14px;
      font-weight: 500;
      color: #1f2937;
      margin: 0;
    }

    .status-badge {
      display: inline-block;
      padding: 6px 12px;
      background: #10b981;
      color: white;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-top: 24px;
    }

    .btn {
      flex: 1;
      padding: 12px 24px;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover {
      background: #2563eb;
    }

    .btn-secondary {
      background: #f3f4f6;
      color: #374151;
      border: 1px solid #d1d5db;
    }

    .btn-secondary:hover {
      background: #e5e7eb;
    }

    .no-reservation {
      text-align: center;
      padding: 48px 24px;
      color: #6b7280;
    }

    .no-reservation-icon {
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      color: #d1d5db;
    }

    .loading {
      text-align: center;
      padding: 48px 24px;
      color: #6b7280;
    }

    .info-section {
      background: #fef3c7;
      border: 1px solid #f59e0b;
      border-radius: 8px;
      padding: 16px;
      margin-top: 24px;
    }

    .info-title {
      font-size: 14px;
      font-weight: 600;
      color: #92400e;
      margin: 0 0 8px 0;
    }

    .info-list {
      font-size: 14px;
      color: #92400e;
      margin: 0;
      padding-left: 16px;
    }

    .info-list li {
      margin-bottom: 4px;
    }
  `;

  const handleConfirmReservation = () => {
    alert('예약이 완료되었습니다!');
  };

  const handleCancelReservation = () => {
    localStorage.removeItem('baseballReservation');
    if (window.confirm('예약을 취소하시겠습니까?')) {
      window.close();
    }
  };

  if (loading) {
    return (
      <>
        <style>{styles}</style>
        <div className="reservation-container">
          <div className="loading">
            <div>로딩 중...</div>
          </div>
        </div>
      </>
    );
  }

  if (!reservationData) {
    return (
      <>
        <style>{styles}</style>
        <div className="reservation-container">
          <div className="no-reservation">
            <Calendar className="no-reservation-icon" />
            <h2>예약 정보가 없습니다</h2>
            <p>달력에서 경기 날짜를 선택하여 예약해주세요.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="reservation-container">
        <div className="header">
          <h1>야구경기 예약</h1>
          <p>선택하신 경기의 예약 정보를 확인해주세요</p>
        </div>

        <div className="reservation-card">
          <div className="status-badge">예약 대기</div>
          
          <div className="date-section">
            <div className="date-icon">
              <Calendar size={24} color="white" />
            </div>
            <div className="date-info">
              <h2 className="date-main">{formatDate(reservationData.date)}</h2>
              <p className="date-sub">{getDayOfWeek(reservationData.date)}</p>
            </div>
          </div>

          <div className="game-details">
            <div className="detail-item">
              <Clock className="detail-icon" />
              <div className="detail-content">
                <p className="detail-label">경기 시간</p>
                <p className="detail-value">오후 7시 00분</p>
              </div>
            </div>
            
            <div className="detail-item">
              <MapPin className="detail-icon" />
              <div className="detail-content">
                <p className="detail-label">경기장</p>
                <p className="detail-value">문학야구장</p>
              </div>
            </div>
            
            <div className="detail-item">
              <Users className="detail-icon" />
              <div className="detail-content">
                <p className="detail-label">인천팀</p>
                <p className="detail-value">LG vs KIA</p>
              </div>
            </div>
            
            <div className="detail-item">
              <Calendar className="detail-icon" />
              <div className="detail-content">
                <p className="detail-label">예약 시간</p>
                <p className="detail-value">
                  {new Date(reservationData.timestamp).toLocaleString('ko-KR')}
                </p>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn btn-primary" onClick={handleConfirmReservation}>
              예약 확정
            </button>
            <button className="btn btn-secondary" onClick={handleCancelReservation}>
              예약 취소
            </button>
          </div>
        </div>

        <div className="info-section">
          <h3 className="info-title">예약 안내사항</h3>
          <ul className="info-list">
            <li>예약 확정 후 취소 시 수수료가 발생할 수 있습니다</li>
            <li>경기 시작 2시간 전까지 입장 가능합니다</li>
            <li>우천 시 경기 일정이 변경될 수 있습니다</li>
            <li>예약 확정 시 등록된 연락처로 안내 메시지를 발송합니다</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Reservation;