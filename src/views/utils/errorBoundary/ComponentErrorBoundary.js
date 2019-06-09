import React, { Component } from 'react'

export default class ComponentErrorBoundary extends Component {
    constructor(props){
        super(props)
        this.state = { error: null, errorInfo: null }
    }

    componentDidCatch(error, info){
        this.setState({ error: error, errorInfo: info })
    }

    render() {
        if(this.state.errorInfo){
            return (
                <div>
                    <summary>Something went wrong while rendering component</summary>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        { this.state.error && this.state.error.toString() }
                        { this.state.errorInfo.componentStack }
                    </details>
                </div>
            )
        }
        return this.props.children
    }
}