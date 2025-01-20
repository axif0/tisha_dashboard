import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Typography, Divider, Button, Container } from '@mui/material'
import { makeStyles } from '@mui/styles'
import CustomerSuggestion from './CustomerSuggestion'
import OrderDetails from './OrderDetails'
import { useDispatch } from 'react-redux'
import { asyncAddBill } from '../../../action/billsAction'

const useStyle = makeStyles({
    summaryContainer: {
        height: '65vh'
    }, 
    title: {
        fontWeight: '700',
        textAlign: 'center'
    }
})

const SummaryOfBill = (props) => {
    const classes = useStyle()
    const { handleCustomerInfo, lineItems, customerInfo } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGenerateBill = () => {
        const items = []
        lineItems.forEach(item => {
            items.push({product: item._id, quantity: item.quantity})
        })
        const billData = {
            date: new Date(),
            customer: customerInfo._id,
            lineItems: items
        }
        dispatch(asyncAddBill(billData, navigate))
    }

    return (
        <Paper elevation={3} className={classes.summaryContainer}>
            <Typography className={classes.title} variant='h5'>Summary of bill</Typography>
            <Divider />
            <Container>
                <CustomerSuggestion handleCustomerInfo={handleCustomerInfo} />
            </Container>
            <Divider />
            <OrderDetails lineItems={lineItems} />
            <Container>
                <Button 
                    variant='contained' 
                    color='primary' 
                    fullWidth
                    onClick={handleGenerateBill}
                >
                    Generate Bill
                </Button>
            </Container>
        </Paper>
    )
}

export default SummaryOfBill