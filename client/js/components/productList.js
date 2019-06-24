import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Table, Button, Icon } from "semantic-ui-react";

const TableRow = ({product, getProductByID, onDeleteProduct, updateProductForm}) => 
    <Table.Row>
        <Table.Cell>{product.name}</Table.Cell>
        <Table.Cell>{product.enabled? 'Active': 'Inactive'}</Table.Cell>
        <Table.Cell>
            <Button 
                onClick={()=> getProductByID(product._id)}
                icon
                basic
                color='green'
            >
                <Icon name='eye' />
            </Button>
            <Button 
                onClick={()=> updateProductForm(product.name, product.enabled, product.sort, product._id, true)}
                icon
                basic
                color='green'
            >
                <Icon name='edit' />
            </Button>
            <Button
                onClick={() => onDeleteProduct(product._id)}
                icon
                basic
                color='red'
            >
                <Icon name='trash outline' />
            </Button>
        </Table.Cell>
    </Table.Row>
;

class ProductList extends PureComponent {

    render() {
        const {
            products,
            getProductByID,
            onDeleteProduct,
            updateProductForm
        } = this.props;

        return (
            <Table celled textAlign="center">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {
                        products?
                            products.map((o, key) => 
                            (
                                <TableRow
                                    key={key.toString()}
                                    getProductByID={getProductByID} 
                                    onDeleteProduct={onDeleteProduct}
                                    updateProductForm={updateProductForm}
                                    product={o}     
                                />
                            )
                        ): null
                    }
                </Table.Body>
            </Table>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired,
    onDeleteProduct: PropTypes.func,
    getProductByID: PropTypes.func,
    updateProductForm: PropTypes.func,
}

export default ProductList;
