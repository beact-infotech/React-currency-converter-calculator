import React from 'react'
import './App.css';
import { Card, Form, FormGroup } from 'react-bootstrap';
import { Button, Input, Label } from 'reactstrap';
import Select from "react-select";
import { useEffect, useState } from 'react';
import exchang from './exchang.svg'
import axios from 'axios'


const App = () => {
const [convertedvalue,setconvertedvalue] = useState()
const [options,setoptions] = useState()
const [valuenum,setvaluenum] = useState(1)
const [fromvalue,setfromvalue] = useState()
const [tovalue,settovalue] = useState()
const [modData,setmodData] = useState()

/*get currency list from api */
useEffect(()=>{
  axios.get(`https://openexchangerates.org/api/latest.json?app_id=89a0f2d38ea640f6bfa3c28c737df776`)
  .then(response => {
    setmodData(response.data)
    setoptionsfleg()
  })
  .catch(err => console.log(err))
},[])

/*add currency data */
useEffect(()=>{
  modData &&
  setoptionsfleg()
},[modData])

/*set options*/
  const setoptionsfleg = () => {
    const d = modData && Object.keys(modData?.rates)
    const lower = d && d.map(e => {
      return e.toLowerCase();
      });
    const e = lower && lower.map((m)=>{
    const arr = { value: m , label: <div className='flags'><i className={`currency-flag currency-flag-${m}`}/>{m}</div> }
    return arr
      })
    setoptions(e)
  }

  /*get currency rate*/
  const getCurrencyRate = (val) => {
    return modData?.rates[val]
  }

  /*convert currency*/
  const convert = () =>{
   const fromrate = getCurrencyRate(fromvalue.toUpperCase())
   const torate = getCurrencyRate(tovalue.toUpperCase())
   console.log(fromrate,torate)
   const converter =  (torate * valuenum) / fromrate;
   setconvertedvalue(converter)
  }

  /*exchange currency*/
  const exchange = () =>{
    const from = fromvalue 
    const to = tovalue 
    setfromvalue(to)
    settovalue(from)
  }

  

  return (
    <React.Fragment>
    <div className="App">
      <div>
      {/* header title */}
      <Card className='card'>
        <div className='header-text'>Exchange Rate</div>
        <p className='currency-text'>{convertedvalue ? convertedvalue : '000'} </p>
      <Form>
        {/* currency amount input */}
        <FormGroup className=''>
            <Label className="mb-1 label"  htmlFor="val-RegNo">Amount</Label>
              <Input className="form-control"
              id='val-RegNo'
              value={valuenum}
              onChange={(e) => setvaluenum(e.target.value)}
                required
              />
        </FormGroup>
          <div className='selector-control'>
            {/* currency select from */}
              <label>
                <div className="label">From</div>
                <Select
                  className="react-select-container"
                  options={options}
                  value={options?.filter((f)=> f.value === fromvalue)}
                  onChange={(e) => setfromvalue(e.value)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 2,
                    colors: {
                      ...theme.colors,
                      primary50: "gold",
                      primary25: "gold",
                      primary: "gold",
                      neutral60: "black",
                      neutral40: "darkslategray",
                      neutral30: "darkslategray",
                      neutral20: "darkslategray",
                    },
                  })}
                />
              </label>
              <img onClick={exchange} className='img-exchange' width='24px' height='24px' src={exchang} />
              {/* currency select to*/}
              <label>
                <div className="label">To</div>
                <Select
                  className="react-select-container"
                  options={options}
                  value={options?.filter((f)=> f.value === tovalue)}
                  onChange={(e) => settovalue(e.value)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 2,
                    colors: {
                      ...theme.colors,
                      primary50: "gold",
                      primary25: "gold",
                      primary: "gold",
                      neutral60: "black",
                      neutral40: "darkslategray",
                      neutral30: "darkslategray",
                      neutral20: "darkslategray",
                    },
                  })}
                />
              </label>
          </div>
          <Button color="primary" className='btn-converter' onClick={convert}>Convert</Button>
      </Form>
      </Card>
    </div>
    </div>
    
    </React.Fragment>
  );
}

export default App;
