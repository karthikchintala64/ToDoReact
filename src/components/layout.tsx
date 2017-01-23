import * as React from 'react';


class Layout extends React.Component<any, any> {
    render() {
            return <section className="todoapp">{this.props.children}</section>
    }
}

export default Layout;