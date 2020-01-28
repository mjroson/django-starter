import React from 'react';
import { ENTITY_PLURAL_NAME } from '../constants';
import { Button, PageHeader } from 'antd';

const DashboardHeader = ({onCreate, ...props}) => {
    return(
        <PageHeader
            title={ENTITY_PLURAL_NAME}
            onBack={() => window.history.back()}
            subTitle="listado de usuarios registrados"
            extra={[
                <Button
                    type="primary"
                    onClick={() => onCreate()}
                    key="new_user"
                    style={{ float: 'right', marginLeft: '5px' }}
                >
                    Nuevo Post
          </Button>
            ]}
        >
            {props.children}
        </PageHeader>
    )
}

export default DashboardHeader;