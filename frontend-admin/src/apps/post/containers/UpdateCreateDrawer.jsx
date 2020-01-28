import React from 'react';
import { Drawer } from 'antd';
import ObjectForm from './Form';
import { useDispatch } from 'react-redux';

const UpdateCreateDrawer = ({ currentObj, visibleForm, setVisibleForm, ...props}) => {
    const dispatch = useDispatch();

    const submit = (obj) => {
        if (currentObj) {
            // dispatch(update(obj));
            dispatch({
                type: 'UPDATE_POST',
                payload: {
                    post: obj
                }
            });
        } else {
            // dispatch(create(obj));
            dispatch({
                type: 'CREATE_POST',
                payload: {
                    post: obj
                }
            });
        }
        setVisibleForm(false);
    }
    return(
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
                submit={submit}
            />
        </Drawer>
    )
}

export default UpdateCreateDrawer;