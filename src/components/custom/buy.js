import React from "react";
import BN from "bn.js";
import { Modal, Button, Form, InputNumber } from "antd";
import { connect } from "react-redux";

const PRICE = 0.00019449; // Price en ether
const CROWDSALE = "0x814577647A3C290418c7836C24e52e719cBe7ccB";
const POW = new BN(10);

const sleep = seconds => new Promise( resolve => setTimeout( resolve, seconds * 1e3 ) );

class Buy extends React.Component {

  state = {
    loading: false
  }

  form = React.createRef();

  onFinish = async values => {
    const { eth } = values;
    const metamask = await this.getMetamask();
    this.setState( { loading: true } );

    try {
      const value = new BN( eth * 1e8 ).mul(POW.pow( POW )).toString(16);
      const transactionParameters = {
        to: CROWDSALE,
        from: metamask.selectedAddress,
        gas: '0x186A0',
        value
      };
      const txHash = await metamask.request( {
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      } );
      await sleep( 2 );
      Modal.success( {
        title: 'Transacción enviada',
        content: (
          <>
            Para ver transacción en el explorador (
            <a href={`https://ropsten.etherscan.io/tx/${txHash}`} target="_blank" rel="noopener noreferrer">
              <b>haga click aquí</b>
            </a>)
          </>
        )
      } );

      this.form.current.setFieldsValue( { ibi: '', eth: '' } );
    } catch( e ) {
      const value = new BN( eth * 1e8 ).mul(POW.pow( POW )).toString(10);
      window.location.href = `https://metamask.app.link/send/${CROWDSALE}?value=${value}`
    }
    this.setState( { loading: false } );
  }

  onChangeEth = value => {
    console.log(value, PRICE, value / PRICE);
    this.form.current.setFieldsValue( { ibi: Number(value / PRICE).toFixed(8) } );
  }

  onChangeIbi = value => {
    this.form.current.setFieldsValue( { eth: Number(value * PRICE).toFixed(8)  } );
  }

  getMetamask = async() => {
    if( window.ethereum ) {
      await window.ethereum.enable();
      return window.ethereum;
    }
    return null;
  }


  render() {
    const { loading } = this.state;
    return (
      <Form
        ref={this.form}
        layout="vertical"
        hideRequiredMark
        onFinish={this.onFinish}
        className="mb-4"
      >
        <Form.Item
          name="ibi"
          label="Cantidad de XOY"
          rules={[{ required: true, message: 'Es necesario especificar la cantidad de XOY' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min="10"
            step="0.00000001"
            size="large"
            onChange={this.onChangeIbi}
            stringMode
          />
        </Form.Item>
        <Form.Item
          name="eth"
          label="Cantidad de Ethereum"
          rules={[{ required: true, message: 'Es necesario especificar la cantidad de ETH' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            step="0.00000001"
            size="large"
            onChange={this.onChangeEth}
            stringMode
          />
        </Form.Item>
        <Button
          type="primary"
          size="large"
          style={{ marginTop: '20px' }}
          className="text-center w-100"
          htmlType="submit"
          loading={loading}
        >
          <strong>Comprar Tokens</strong>
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = ({ user, dispatch }) => ({
  dispatch,
  user
})

export default connect( mapStateToProps )( Buy );
