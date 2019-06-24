import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Header, Table, Button, Icon, Form, Checkbox, Grid } from "semantic-ui-react";
import ProductList from "./productList";
import {
    getAllProduct,
    getProductByID,
    onCreateProduct,
    onUpdateProduct,
    onDeleteProduct
} from "../actions/productActions";

class Product extends PureComponent {

    state = {
        name: "",
        sort: 1,
        enabled: false,
        isUpdate: false
    }

    componentDidMount() {
        this.props.getAllProduct();
    }

    resetForm = () => {
        this.setState({
            name: "",
            sort: 1,
            enabled: false,
            isUpdate: false
        })
    }

    handleProductForm = (event) => {
        event.preventDefault();
        const { onCreateProduct, onUpdateProduct } =  this.props;
        if(this.state.isUpdate) {
            const { name, enabled, sort } = this.state;
            onUpdateProduct({ product_line: this.state }, this.state._id);
        } else {
            onCreateProduct({ product_line: this.state });
        }
        this.resetForm();
    }

    updateProductForm = (name, enabled, sort, _id, isUpdate) => {
       this.setState({ name, enabled, sort, _id, isUpdate });
    }

    onChangeInput = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.type === "checkbox" ? !target.checked : target.value;
        this.setState({ 
            [name]: value 
        });
    }

    render() {
        const {
            store,
            store: { products },
            onDeleteProduct,
            getAllProduct,
            getProductByID
        } = this.props;
        return (
            <div>
                <Header size='large' textAlign="center">Product Lists</Header>
                <Grid centered>
                    <Grid.Row>
                        <Grid.Column mobile={12} tablet={8} computer={6} textAlign="left">
                            <Header size='medium' textAlign="left">{this.state.isUpdate? "Update": "Add"}  Product</Header>
                            <Form onSubmit={this.handleProductForm}>
                                <Form.Field>
                                    <label>Product Name</label>
                                    <input
                                        type="text"
                                        placeholder='Product Name'
                                        name="name"
                                        onChange={this.onChangeInput}
                                        value={this.state.name}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <label>Sort</label>
                                    <input
                                        type="number"
                                        placeholder='Sort'
                                        name="sort"
                                        onChange={this.onChangeInput}
                                        value={this.state.sort}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input type="checkbox"
                                        label="Enable"
                                        name="enabled"
                                        onChange={this.onChangeInput}
                                    />
                                </Form.Field>
                                <Button type='submit'>{this.state.isUpdate ? "Update Product": "Add Product"}</Button>
                                <Button type='button' onClick={this.resetForm}>Cancel</Button>
                            </Form>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column mobile={12} tablet={14} computer={14} textAlign="left">
                            <Button onClick={()=> getAllProduct()} basic color='green' floated="right" className="show-all-product">
                                Show All Product
                            </Button>
                            <ProductList
                                products={products}
                                getProductByID={getProductByID}
                                onDeleteProduct={onDeleteProduct}
                                updateProductForm={this.updateProductForm}
                            />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

            </div>
        );
    }
}

Product.propTypes = {
    store: PropTypes.object.isRequired,
    onDeleteProduct: PropTypes.func,
    onCreateProduct: PropTypes.func,
    onUpdateProduct: PropTypes.func,
    getProductByID: PropTypes.func
}

const mapStateToProps = state => ({ 
    store: state.ProductStore, 
    userData: state.LoginStore.userData 
});

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        getAllProduct: () => dispatch(getAllProduct()),
        getProductByID: (id) => dispatch(getProductByID(id)),
        onDeleteProduct: (id) => dispatch(onDeleteProduct(id)),
        onUpdateProduct: (product, id) => dispatch(onUpdateProduct(product, id)),
        onCreateProduct: (product) => dispatch(onCreateProduct(product))
    });
}


export default connect(mapStateToProps, mapDispatchToProps)(Product);
