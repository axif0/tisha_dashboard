import React from 'react'
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TableFooter } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyle = makeStyles({
    tableHeaderFooter: {
        color: 'black',
        fontWeight: 600,
        fontSize: 14
    }
})

const BillItemtable = (props) => {
    const { items, total } = props
    const classes = useStyle()

    return (
        <TableContainer component={Paper}>
            <Table size='small'>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHeaderFooter}>S.No</TableCell>
                        <TableCell className={classes.tableHeaderFooter}><b>মালের নাম</b></TableCell>
                        <TableCell className={classes.tableHeaderFooter}><b>দাম</b></TableCell>
                        <TableCell className={classes.tableHeaderFooter}><b>পরিমান</b></TableCell>
                        <TableCell className={classes.tableHeaderFooter}><b>মোট</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.subTotal}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell className={classes.tableHeaderFooter}>Total Amount</TableCell>
                        <TableCell className={classes.tableHeaderFooter}>{total}</TableCell>
                    </TableRow>   
                </TableFooter>
            </Table>
        </TableContainer>
    )
}

export default BillItemtable