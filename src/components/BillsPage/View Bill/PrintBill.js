import { Button } from '@mui/material'
import moment from 'moment'
import React, { useRef } from 'react'
import html2pdf from 'html2pdf.js'
import GetAppIcon from '@mui/icons-material/GetApp'
import logo from '../../../images/tpp.jpg'
import { englishToBengali } from '../../../utils/bengaliNumerals'

const PrintBill = (props) => {
    const { customer, customerAddress, bill, id, items } = props
    const billRef = useRef(null)

    const generatePdf = () => {
        const element = billRef.current
        const opt = {
            margin: 15,
            filename: `${id}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }

        html2pdf().from(element).set(opt).save()
    }

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                startIcon={<GetAppIcon />}
                onClick={generatePdf}
            >
                Download Bill
            </Button>

            {/* Hidden bill template that will be converted to PDF */}
            <div style={{ display: 'none' }}>
                <div ref={billRef} style={{ 
                    padding: '15px 25px 25px',
                    fontFamily: 'Arial, sans-serif',
                    maxWidth: '210mm',
                    margin: '0 auto',
                    position: 'relative'
                }}>
                    {/* Add watermark */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(-45deg)',
                        fontSize: '60px',
                        color: 'rgba(128, 128, 128, 0.10)',
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        zIndex: 1,
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        TISHA PLASTIC
                    </div>

                    {/* Header - Adjusted position upward */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '30px',
                        padding: '5px 0'
                    }}>
                        <img src={logo} alt="Logo" style={{ 
                            width: '110px', 
                            height: '110px',
                            objectFit: 'contain'
                        }} />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <h2 style={{ 
                                color: '#2c3e50', 
                                margin: '0 0 12px 0',
                                fontSize: '32px',
                                fontWeight: 'bold',
                                letterSpacing: '0.5px'
                            }}>TISHA PLASTIC PRODUCTS</h2>
                            <div style={{ 
                                color: '#7f8c8d',
                                fontSize: '15px',
                                lineHeight: '1.5'
                            }}>
                                <p style={{ margin: '0 0 4px 0' }}>Address: 6/7/7/1, Champatoli Lane, Soyarighat, Dhaka</p>
                                <p style={{ margin: '0' }}>Contact: 01744798523, 01325-418059</p>
                            </div>
                        </div>
                    </div>

                    {/* Bill Title - Reduced size */}
                    <div style={{ 
                        backgroundColor: '#3498db', 
                        color: 'white', 
                        padding: '8px',
                        textAlign: 'center',
                        marginBottom: '20px'
                    }}>
                        <h2 style={{ 
                            margin: 0, 
                            fontSize: '20px'
                        }}>BILL</h2>
                    </div>

                    {/* Bill Details */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginBottom: '25px',
                        padding: '0 10px'
                    }}>
                        <div>
                            <h3>Bill To:</h3>
                            <p><strong>{customer.name}</strong></p>
                            <p>{customerAddress}</p>
                        </div>
                        <div>
                            <p><strong>Invoice No:</strong> {id}</p>
                            <p><strong>Date:</strong> {moment(bill.createdAt).format('DD/MM/YYYY')}</p>
                        </div>
                    </div>

                    {/* Items Table with adjusted margins */}
                    <table style={{ 
                        width: '100%', 
                        borderCollapse: 'collapse',
                        marginBottom: '25px'
                    }}>
                        <thead>
                            <tr style={{ backgroundColor: '#3498db', color: 'white' }}>
                                <th style={{ padding: '10px', border: '1px solid #bdc3c7' }}>SL</th>
                                <th style={{ padding: '10px', border: '1px solid #bdc3c7' }}>মালের নাম</th>
                                <th style={{ padding: '10px', border: '1px solid #bdc3c7' }}>দাম</th>
                                <th style={{ padding: '10px', border: '1px solid #bdc3c7' }}>পরিমান</th>
                                <th style={{ padding: '10px', border: '1px solid #bdc3c7' }}>মোট</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, i) => (
                                <tr key={i}>
                                    <td style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'center' }}>
                                        {englishToBengali(i + 1)}
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #bdc3c7' }}>{item.product.name}</td>
                                    <td style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'right' }}>
                                        ৳{englishToBengali(item.price)}
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'center' }}>
                                        {englishToBengali(item.quantity)}
                                    </td>
                                    <td style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'right' }}>
                                        ৳{englishToBengali(item.subTotal)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr style={{ backgroundColor: '#f8f9fa' }}>
                                <td colSpan="4" style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'right' }}>
                                    <strong>Total Amount:</strong>
                                </td>
                                <td style={{ padding: '8px', border: '1px solid #bdc3c7', textAlign: 'right' }}>
                                    <strong>৳{englishToBengali(bill.total)}</strong>
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    {/* Signatures with adjusted spacing */}
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between',
                        marginTop: '60px',
                        padding: '0 20px'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ borderTop: '1px solid #000', width: '150px', margin: '0 auto' }}></div>
                            <p>Customer's Signature</p>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ borderTop: '1px solid #000', width: '150px', margin: '0 auto' }}></div>
                            <p>Seller's Signature</p>
                        </div>
                    </div>

                    {/* Footer with adjusted margin */}
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '40px',
                        marginBottom: '20px',
                        color: '#7f8c8d'
                    }}>
                        <p>Thank you for your business!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PrintBill