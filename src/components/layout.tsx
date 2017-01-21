import * as React from 'react';


class Layout extends React.Component<any, any> {
    render() {
            return <div>{this.props.children}</div>
    }
}

export default Layout;