import React from 'react'
import { PublicReportProvider } from '../../context/PublicReportContext'
import Container from './Container'


const PublicReport = () => {
    

    return (
        <PublicReportProvider>
            <Container />
        </PublicReportProvider>
    )
}

export default PublicReport