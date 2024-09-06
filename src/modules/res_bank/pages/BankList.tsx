import { Button, Flex } from 'antd'
import BankTable from '../components/BankTable'
import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'


/* type Props = {}
 */
const BankList = (/* props: Props */) => {

    console.log(useAuth())
    return (
        <Flex vertical gap={16} style={{ height: '100%' }}>
            <Flex justify="space-between" gap={16} align="center" >
                <h1>Bancos</h1>
                <Link to="/contactos/banco/nuevo">
                    <Button type="primary">Nuevo Banco</Button>
                </Link>
            </Flex>
            <BankTable />
        </Flex>
    )
}

export default BankList