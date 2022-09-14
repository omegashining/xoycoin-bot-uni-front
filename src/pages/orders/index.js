import React from 'react'
import { Alert, Card, Table } from 'antd'
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";
import axios from 'axios';
import moment from "moment";

class ReceivedVC extends React.Component {
  state = {
    swaps: [],
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true});
    axios.get(`${process.env.REACT_APP_API_URL}/swaps`)
      .then( result => result.data )
      .then( result => {
        if( !result ) return this.setState({swaps: [], loading: false});
        return this.setState({swaps: result.swaps, loading: false})
      } )
      .catch( () => {
        return this.setState({error:'Invalid decryption key', loading: false})
      } );
  }

  render() {
    const columns = [
      {
        title: 'Timestamp',
        dataIndex: 'timestamp',
        key: 'timestamp',
        render: value => moment( value * 1000 ).format( 'DD/MM/YYYY HH:mm:ss' )
      },
      {
        title: 'Pair',
        dataIndex: 'token0',
        key: 'token0',
        render: (_, record) => {
          const from = record.token0.symbol.replace('WETH', 'ETH')
          const to = record.token1.symbol.replace('WETH', 'ETH')
          if( record.amount0 < 0 )
            return `${to} -> ${from}`;
          return `${from} -> ${to}`;
        },
      },
      {
        title: 'Price',
        dataIndex: 'tickUpper',
        key: 'tickUpper',
        render: ( value, record ) => Math.abs( record.amount0 / record.amount1 ).toFixed( 8 )
      },
      {
        title: 'Enviado',
        dataIndex: 'amount0',
        key: 'amount0',
        align: 'right',
        render: ( _, record ) => {
          const amount0 = Math.abs( record.amount0 ).toFixed( 5 );
          const amount1 = Math.abs( record.amount1 ).toFixed( 5 );
          if( record.amount0 < 0 )
            return `${amount1} ${record.token1.symbol} -> ${amount0} ${record.token0.symbol}`;
          return `${amount0} ${record.token0.symbol} -> ${amount1} ${record.token1.symbol}`;
        }
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (_, record) => {
          if( record.amount1 < 0 ){
            return (
              <span className="font-size-12 badge badge-success">
                Compra
              </span>
            );
          }
          return (
            <span className="font-size-12 badge badge-warning">
              Venta
            </span>
          );
        }
        // sorter: ( a, b ) => a.status.length - b.status.length,
      }
    ]
    const { loading, swaps, error } = this.state;
    if( error ) {
      return <Redirect to="/auth/login" />
    }
    return (
      <div>
        <Helmet title="Ordenes" />
        <div className="cui__utils__heading">
          <strong>XOY Bot » Ordenes</strong>
        </div>
        {error &&
        <Alert message={error} type="error" className="mb-4" />
        }
        <Card className="card" loading={loading}>
          <div className="card-header card-header-flex">
            <div className="d-flex flex-column justify-content-center mr-auto">
              <h5 className="mb-0">Uniswap Ordenes</h5>
            </div>
          </div>
          <div className="card-body">
            <div className="text-nowrap">
              <Table columns={columns} dataSource={swaps} rowKey="request" />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ( { user } ) => ( { user } );

export default connect( mapStateToProps )(ReceivedVC)
