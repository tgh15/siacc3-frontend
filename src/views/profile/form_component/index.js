import React from 'react'
import { Camera, File, Image, Link, Mic, Send } from 'react-feather'
import { Button, FormGroup, Label } from 'reactstrap'


export const AddBeritaFormComponent = ()=>{
    return(
        <div>
            <FormGroup>
                <Label>Judul</Label>
                <textarea className="form-control" placeholder="Judul..."/>
            </FormGroup>
            <FormGroup>
                <Label>Apa yang Terjadi</Label>
                <textarea className="form-control" placeholder="Apa yang terjadi..."/>
            </FormGroup>
            <FormGroup>
                <Label>Mengapa Hal itu Terjadi</Label>
                <textarea className="form-control" placeholder="Mengapa Hal itu terjadi..."/>
            </FormGroup>
            <FormGroup>
                <Label>Siapa Saja yang Terlibat</Label>
                <textarea className="form-control" placeholder="Siapa Saja yang Terlibat..."/>
            </FormGroup>
            <FormGroup>
                <Label>Tempat Kejadian</Label>
                <input className="form-control" placeholder="Tempat Kejadian"/>
            </FormGroup>
            <FormGroup>
                <Label>Kapan Peristiwa itu terjadi</Label>
                <input className="form-control"  placeholder="Kapan Peristiwa itu Terjadi..."/>
            </FormGroup>
            <FormGroup>
                <Label>Bagaimana Peristiwa itu terjadi</Label>
                <textarea className="form-control"></textarea>
            </FormGroup>
            
            <FormGroup>
                <Label>Tambahkan Media</Label>
                <div className="row justify-content-center">
                    <Button className="btn-icon btn-sm" color=""><Image/></Button>
                    <Button className="btn-icon btn-sm" color=""><File/></Button>
                    <Button className="btn-icon btn-sm" color=""><Mic/></Button>
                    <Button className="btn-icon btn-sm" color=""><Camera/></Button>
                    <Button className="btn-icon btn-sm" color=""><Link/></Button>
                </div>
            </FormGroup>
            <FormGroup>
                <Button className="btn-block btn-sm" color="primary">
                    <Send/>&nbsp;Kirim
                </Button>
            </FormGroup>
        </div>
    )
}