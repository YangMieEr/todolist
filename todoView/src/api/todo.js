import fetch from './index';
import qs from 'qs';
export function getTodoList () {
    return fetch({
        method: 'get',
        url: 'todo/getlist',
        params: {
            name: 'bbb'
        }
    });
}

export function removeTodoItem (params) {
    return fetch({
        method: 'delete',
        url: 'todo/remove/' + params
    });
}

export function  addTodoItem (param) {
    return fetch({
        method: 'post',
        url: 'todo/add',
        data: qs.stringify({
            item: param
        })
    })
}