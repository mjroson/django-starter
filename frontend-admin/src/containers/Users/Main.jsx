import { Button, Col, Drawer, Icon, PageHeader, Popconfirm, Row } from 'antd';
import AppliedFilters from 'components/AppliedFilters';
import SearchForm from 'components/SearchForm';
import ObjectsTable from 'components/Table';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams
} from 'use-query-params';
import { CustomDateParam } from 'utils/filter-params';
import { displayDate } from 'utils/formats';
import { destroy, list } from './actions';
import FormFilter from './components/Filter';
import ObjectForm from './components/Form';
import { ENTITY_NAME, ENTITY_PLURAL_NAME, PAGE_SIZE } from './constants';

const TablePage = props => {
  const dispatch = useDispatch();
  const [currentObj, setCurrentObj] = useState(null);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [visibleForm, setVisibleForm] = useState(false);
  const [query, setQuery] = useQueryParams({
    page: NumberParam,
    search: StringParam,
    ordering: StringParam,
    first_name: StringParam,
    last_name: StringParam,
    date_joined: CustomDateParam,
    date_joined_range: ArrayParam,
    id: NumberParam
  });

  const objects = useSelector(state => state.users);

  // Is it necesary or get values from objects const ?
  const reqCreateSuccess = useSelector(
    state => state.users.reqStatus.create === 'loaded'
  );
  const reqUpdateSuccess = useSelector(
    state => state.users.reqStatus.update === 'loaded'
  );
  const reqListLoading = useSelector(
    state => state.users.reqStatus.list !== 'loaded'
  );

  useEffect(() => {
    dispatch(list(query));
  }, [query]);

  useEffect(() => {
    setCurrentObj(undefined);
    setVisibleForm(false);
  }, [reqCreateSuccess, reqUpdateSuccess]);

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

  const isColumnSorted = fieldName => {
    const sorted = query.ordering || '';
    return [fieldName, `-${fieldName}`].includes(sorted)
      ? sorted.charAt(0) !== '-'
        ? 'ascend'
        : 'descend'
      : false;
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: true,
      sortOrder: isColumnSorted('id')
    },
    {
      title: 'Nombre y Apellido',
      dataIndex: 'last_name',
      render: (text, obj) => `${obj.last_name}, ${obj.first_name}`,
      sorter: true,
      sortOrder: isColumnSorted('last_name')
    },
    {
      title: 'Email Principal',
      dataIndex: 'email',
      sorter: true,
      sortOrder: isColumnSorted('email')
    },
    {
      title: 'Fecha de registro',
      dataIndex: 'date_joined',
      render: date => displayDate(date),
      sorter: true,
      sortOrder: isColumnSorted('date_joined')
    },
    {
      title: 'Activo',
      dataIndex: 'is_active',
      render: value =>
        value ? (
          <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
        ) : (
          <Icon type="minus-circle" theme="twoTone" twoToneColor="#ff4747" />
        )
    },
    {
      title: 'Acciones',
      key: 'operation',
      render: obj => (
        <span className="table-column-actions">
          <Popconfirm
            title={`¿Desea eliminar este ${ENTITY_NAME}?`}
            onConfirm={() => dispatch(destroy(obj))}
          >
            <a>Eliminar</a>
          </Popconfirm>
          <a onClick={() => onUpdate(obj)}>Editar</a>
        </span>
      )
    }
  ];

  return (
    <>
      <Drawer
        title={currentObj === null ? 'Crear Usuario' : 'Editar Usuario'}
        width={720}
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
        />
      </Drawer>

      <Drawer
        title="Filtros"
        placement="top"
        closable={false}
        onClose={() => setVisibleFilter(false)}
        visible={visibleFilter}
      >
        <FormFilter
          onSubmit={applyFilter}
          onCancel={() => setVisibleFilter(false)}
          filters={query}
        />
      </Drawer>
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
            Nuevo Usuario
          </Button>
        ]}
      >
        <Row>
          <Col span={12}>
            <SearchForm
              submit={search}
              searchValue={query.search || ''}
              placeholder="Ingrese email, nombre o apellido"
            />
          </Col>
          <Col span={12} className="container-general-actions-right">
            <Button onClick={() => setVisibleFilter(true)}>Filtros</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} className="container-applied-filters">
            <AppliedFilters filters={query} removeFilter={removeFilter} />
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
    </>
  );
};

export default TablePage;
