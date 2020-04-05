import React from 'react';
import { Statistic, Card, Row, Col, Icon } from 'antd';

class DashboardPage extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<Icon type="arrow-up" />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<Icon type="arrow-down" />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: '15px' }}>
          <Col span={12}>
            <Card>
              <Statistic
                title="Feedback"
                value={1128}
                prefix={<Icon type="like" />}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Card>
          </Col>
        </Row>
        ,
      </div>
    );
  }
}

export default DashboardPage;
