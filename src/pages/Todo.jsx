import React from 'react';

export default class Todo extends React.Component {
    componentDidMount() {
        document.title = 'Sua lista de tarefas';
    }

    render() {
        return (
            <>
                <h1>Hello world</h1>
            </>
        )
    }
}