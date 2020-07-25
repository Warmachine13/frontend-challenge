import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import { Topbar, RegisterEmpresaDialog } from "components";
import TableModel from "components/TableModel";
import { fetchPlaces } from "reduxItems/ducks/places";
import { Logout } from "reduxItems/ducks/auth";
import { Button } from "@material-ui/core";

const Dashboard = ({ history: { push } }) => {
  let [pesquisa, setPesquisa] = useState()
  let [type, setType] = useState("name")
  const dispatch = useDispatch()
  let { Places } = useSelector(({ places }) => places)

  useEffect(() => {
    dispatch(fetchPlaces()).catch(_ => dispatch(Logout()))
  }, [])
  return (
    <div style={{ width: '100%' }}>
      <Topbar />
      <div style={{ width: '100%', alignItems: 'center', alignContent: 'center', justifyItems: 'center' }}>
        <Button style={{ width: '99%', backgroundColor: 'green' }} onClick={_ => push("RegisterPlace")} ><a style={{ fontWeight: 'bold', color: 'white' }}>Cadastrar nova Localização</a></Button>
      </div>
      <TableModel
        changeSelect={e => { setType(e); dispatch(fetchPlaces(pesquisa, type)); }}
        sendToUpdate={(id, place) => push("RegisterPlace/" + id, {
          place
        })}
        type={type}
        setPesquisa={v => { setPesquisa(v); dispatch(fetchPlaces(v, type)); }}
        placeholder={`Pesquisa pelo ${type}`}
        header={['Nome', 'Estado', 'Cidade', "Slug", "Data de criação", "Data de Atualização"]}
        data={Places}
      />

    </div>
  )

}

export default Dashboard

