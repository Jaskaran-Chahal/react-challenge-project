import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';
import OrderForm from '../order-form/orderForm';

class ViewOrders extends Component {
  state = {
    orders: [],
    isEdit: false,
    order_item: "",
    quantity: "",
    ordered_by: ""
  }

  componentDidMount() {

    fetch(`${SERVER_IP}/api/current-orders`)
      .then(response => response.json())
      .then(response => {
        if (response.success) {
          this.setState({ orders: response.orders });
        } else {
          console.log('Error getting orders');
        }
      });
  }
  menuItemChosen(event) {
    //Correction to problem 1 
    //ERROR: this.setState({ item: event.target.value });
    this.setState({ order_item: event.target.value });
  }

  menuQuantityChosen(event) {
    this.setState({ quantity: event.target.value });
  }
  orderedBy(event) {
    this.setState({ ordered_by: event.target.value });
  }
  editOrder = (id) => {
    if (this.state.isEdit === id)
      this.editOrder("")
    else
      this.setState({ isEdit: id })
  }

  deleteOrder = (id) => {
    fetch(`${SERVER_IP}/api/delete-order`, {
      method: 'POST',
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log("Delete Successful", JSON.stringify(response))
        //window.location = "/view-orders";
      })
      .catch(error => console.error(error));
  }


  render() {
    return (
      <Template>
        <div className="container-fluid">
          {this.state.orders.map(order => {
            const createdDate = new Date(order.createdAt).toTimeString().substr(0, 8);
            return (
              <div className="row view-order-container" key={order._id}>
                {this.state.isEdit === order._id ?
                  <OrderForm edit={this.state.isEdit} id={order._id} />
                  : <>{/* if not editing */}
                    <div className="col-md-4 view-order-left-col p-3">
                      <h2>{order.order_item}</h2>
                      <p>Ordered by: {order.ordered_by || ''}</p>
                    </div>
                    <div className="col-md-4 d-flex view-order-middle-col">
                      <p>Order placed at {createdDate}</p>
                      <p>Quantity: {order.quantity}</p>
                    </div>
                  </>
                }

                <div className="col-md-4 view-order-right-col">
                  <button onClick={() => this.editOrder(order._id)} className="btn btn-success">Edit</button>
                  <button onClick={() => this.deleteOrder(order._id)} className="btn btn-danger">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </Template>
    );
  }
}

export default ViewOrders;
