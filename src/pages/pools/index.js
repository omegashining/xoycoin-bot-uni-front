import React from 'react'
import { Alert, Card, Table } from 'antd'
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet'
import { connect } from "react-redux";
import axios from 'axios';
import { tickToPrice } from "@uniswap/v3-sdk";
import { Token } from "@uniswap/sdk-core";

const TOKENS = {
  '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
    name: 'ETH',
    token: new Token( 1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18 )
  },
  '0xe9F1d62c671EFe99896492766c0B416bD3FB9e52': {
    name: 'XOY',
    token: new Token( 1, '0xe9F1d62c671EFe99896492766c0B416bD3FB9e52', 8 )
  }
};

class ReceivedVC extends React.Component {
  state = {
    pools: [],
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true});
    axios.get(`${process.env.REACT_APP_API_URL}/pools`)
      .then( result => result.data )
      .then( result => {
        if( !result ) return this.setState({pools: [], loading: false});
        return this.setState({pools: result.positions.reverse(), loading: false})
      } )
      .catch( () => {
        return this.setState({error:'Invalid decryption key', loading: false})
      } );
  }

  render() {
    const columns = [
      {
        title: 'Token Id',
        dataIndex: 'id',
        key: 'id',
        // sorter: ( a, b ) => a.request.issuer.length - b.issuer.length,
        render: (_, record) => (
          <a
            className="btn btn-sm btn-light"
            href={`https://app.uniswap.org/#/pool/${record.tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pool #{record.tokenId}
          </a>
        ),
      },
      {
        title: 'Pair',
        dataIndex: 'token0',
        key: 'token0',
        render: (_, record) => {
          const from = TOKENS[record.token0].name || record.token0;
          const to = TOKENS[record.token1].name || record.token1;
          return `${from} - ${to}`;
        },
      },
      {
        title: 'Pool Fee',
        dataIndex: 'fee',
        key: 'fee',
      },
      {
        title: 'Price Lower',
        dataIndex: 'tickLower',
        key: 'tickLower',
        render: ( value, record ) =>
            (1/tickToPrice( TOKENS[record.token0].token, TOKENS[record.token1].token, value ).toSignificant(4)).toFixed(8)
      },
      {
        title: 'Price Upper',
        dataIndex: 'tickUpper',
        key: 'tickUpper',
        render: ( value, record ) =>
            (1/tickToPrice( TOKENS[record.token0].token, TOKENS[record.token1].token, value ).toSignificant(4)).toFixed(8)
      },
      {
        title: 'Token0 Amount',
        dataIndex: 'amount0',
        key: 'amount0'
      },
      {
        title: 'Token1 Amount',
        dataIndex: 'amount1',
        key: 'amount1'
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: status => {
          if(status === 'closed'){
            return (
              <span className="font-size-12 badge badge-danger">
                Cerrado
              </span>
            );
          }
          return (
            <span className="font-size-12 badge badge-success">
              Activo
            </span>
          );
        }
        // sorter: ( a, b ) => a.status.length - b.status.length,
      }
    ]
    const { loading, pools, error } = this.state;
    if( error ) {
      return <Redirect to="/auth/login" />
    }
    return (
      <div>
        <Helmet title="Pools" />
        <div className="cui__utils__heading">
          <strong>XOY Bot » Pools</strong>
        </div>
        {error &&
        <Alert message={error} type="error" className="mb-4" />
        }
        <Card className="card" loading={loading}>
          <div className="card-header card-header-flex">
            <div className="d-flex flex-column justify-content-center mr-auto">
              <h5 className="mb-0">Uniswap Pools</h5>
            </div>
          </div>
          <div className="card-body">
            <div className="text-nowrap">
              <Table columns={columns} dataSource={pools} rowKey="request" />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = ( { user } ) => ( { user } );

export default connect( mapStateToProps )(ReceivedVC)
