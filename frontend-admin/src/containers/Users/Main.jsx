import {
  Button,
  Col,
  Drawer,
  PageHeader,
  Popconfirm,
  Row,
  message
} from 'antd';
import {
  DeleteOutlined,
  FormOutlined,
  CheckCircleTwoTone,
  MinusCircleOutlined
} from '@ant-design/icons';
import AppliedFilters from 'components/AppliedFilters';
import SearchForm from 'components/SearchForm';
import ObjectsTable from 'components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useQueryParams,
  ArrayParam,
  NumberParam,
  StringParam
} from 'use-query-params';
import { CustomDateParam } from 'utils/filter-params';
import { displayDate } from 'utils/formats';
import { widhFilters } from 'utils/crud-hoc';

import { userActions } from './data/models';
import FormFilter from './components/Filter';
import ObjectForm from './components/Form';
import { ENTITY_NAME, ENTITY_PLURAL_NAME, PAGE_SIZE } from './constants';

const FILTERS = {
  page: {
    label: 'Pagina',
    type: NumberParam,
    inForm: false
  },
  search: {
    label: 'Buscador',
    type: StringParam,
    inForm: false
  },
  ordering: {
    label: 'Orden',
    type: StringParam,
    inForm: false
  },
  first_name: {
    label: 'Nombre',
    type: StringParam,
    inForm: true
  },
  last_name: {
    label: 'Apellido',
    type: StringParam,
    inForm: true
  },
  date_joined: {
    label: 'Fecha de registro',
    type: CustomDateParam,
    inForm: true
  },
  date_joined_range: {
    label: 'Rango de recha de registro',
    type: ArrayParam,
    inForm: true
  },
  id: {
    label: 'ID',
    type: NumberParam,
    inForm: false
  }
};

const CRUDPage = ({ filters }) => {
  const dispatch = useDispatch();
  const [currentObj, setCurrentObj] = useState(null);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);

  const objects = useSelector(state => state.users?.listData);

  const reqCreateSuccess = useSelector(
    state => state.users.reqStatus.create === 'loaded'
  );
  const reqUpdateSuccess = useSelector(
    state => state.users.reqStatus.update === 'loaded'
  );

  const formErrors = useSelector(state => {
    return state.users.errors.create || state.users.errors.update;
  });
  const reqListLoading = useSelector(
    state => state.users.reqStatus.list !== 'loaded'
  );

  const [query, setQuery] = useQueryParams(filters);

  useEffect(() => {
    // Example to dispatch list action and use success and error callBack functions (those are optionals)
    if (userActions) {
      dispatch(
        userActions.list(
          query,
          data => {
            console.log('Success callback user list ', data);
          },
          error => {
            if (error.status !== 401) {
              message.error(
                `Hubo un error al intentar recuperar el listado de ${ENTITY_PLURAL_NAME}`
              );
            }
          }
        )
      );
    }
  }, [query, userActions]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!formErrors) {
      setCurrentObj(undefined);
      setVisibleForm(false);
    }
  }, [formErrors, reqCreateSuccess, reqUpdateSuccess]);

  const onChangeParams = params => {
    setQuery({ ...params, page: 1 });
  };

  const onUpdate = obj => {
    setCurrentObj(obj);
    setVisibleForm(true);
  };

  const onCreate = () => {
    setCurrentObj(null);
    setVisibleForm(true);
  };

  const search = value => {
    onChangeParams({ search: value });
  };

  const applyFilter = values => {
    setVisibleFilter(false);
    onChangeParams(values);
  };

  const removeFilter = filterKey => {
    setQuery({ [filterKey]: undefined });
  };

  const OptionsTable = ({ value }) => (
    <span className="table-column-actions">
      <Popconfirm
        title={`¿Desea eliminar este ${ENTITY_NAME}?`}
        onConfirm={() => dispatch(userActions.destroy(value))}
      >
        <DeleteOutlined />
      </Popconfirm>
      <FormOutlined onClick={() => onUpdate(value)} />
    </span>
  );

  const ActiveIcon = ({ value }) =>
    value ? (
      <CheckCircleTwoTone twoToneColor="#52c41a" />
    ) : (
      <MinusCircleOutlined twoToneColor="#ff4747" />
    );

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: 'Nombre y Apellido',
      dataIndex: 'last_name',
      render: (text, obj) => `${obj.last_name}, ${obj.first_name}`,
      sorter: true
    },
    {
      title: 'Email Principal',
      dataIndex: 'email',
      sorter: true
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'date_joined',
      render: date => displayDate(date),
      sorter: true
    },
    {
      title: 'Activo',
      dataIndex: 'is_active',
      render: value => ActiveIcon({ value })
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: obj => OptionsTable({ value: obj })
    }
  ];

  return (
    <div className="generic-crud-section">
      <Drawer
        title={
          currentObj === null ? `Crear ${ENTITY_NAME}` : `Editar ${ENTITY_NAME}`
        }
        className="ant-drawer-horizontal"
        visible={visibleForm}
        onClose={() => setVisibleForm(false)}
        style={{
          overflow: 'auto',
          height: '100%'
        }}
      >
        <ObjectForm
          currentObj={currentObj}
          onClose={() => setVisibleForm(false)}
          formErrors={formErrors}
          create={data => dispatch(userActions.create(data))}
          update={data => dispatch(userActions.update(data))}
        />
      </Drawer>

      <Drawer
        title="Filtros"
        placement="top"
        closable={false}
        className="ant-drawer-vertical"
        onClose={() => setVisibleFilter(false)}
        visible={visibleFilter}
      >
        <FormFilter
          onSubmit={applyFilter}
          onCancel={() => setVisibleFilter(false)}
          filtersData={FILTERS}
          appliedFilters={query}
        />
      </Drawer>
      <PageHeader
        title={ENTITY_PLURAL_NAME}
        onBack={() => window.history.back()}
        subTitle="listado de usuarios registrados"
        className="page-header"
        extra={[
          <Button
            type="primary"
            onClick={() => onCreate()}
            className="btn-actions"
            key="new_user"
          >
            Nuevo {ENTITY_NAME}
          </Button>
        ]}
      >
        <Row>
          <Col md={12} sm={24}>
            <SearchForm
              submit={search}
              searchValue={query.search || ''}
              placeholder="Ingrese email, nombre o apellido"
            />
          </Col>
        </Row>
        <Row className="form-filters">
          <Col md={22} sm={24} className="container-applied-filters">
            <AppliedFilters
              filters={query}
              removeFilter={removeFilter}
              configFilters={FILTERS}
            />
          </Col>
          <Col md={2} sm={24}>
            <Button
              onClick={() => setVisibleFilter(true)}
              className="btn-open-filters-form"
            >
              Filtros
            </Button>
          </Col>
        </Row>

        <ObjectsTable
          results={objects.results}
          columns={columns}
          pagination={{
            total: objects.count,
            current: query.page ? query.page : 1,
            pageSize: PAGE_SIZE
          }}
          loading={reqListLoading}
          footer={() =>
            `Total de ${ENTITY_PLURAL_NAME.toLowerCase()} encontrados ${
              objects.count
            }`
          }
          onChangeParams={onChangeParams}
          sortedField={query.ordering || ''}
          onChangePage={page => setQuery({ page })}
          onUpdate={onUpdate}
          tableLayout="auto"
        />
      </PageHeader>
    </div>
  );
};

export default widhFilters(CRUDPage, FILTERS);
