import Realm from 'realm'

import DepositoSchema from '../schemas/DepositoSchema'

const getRealm = () => {
  return Realm.open({
    schema: [DepositoSchema]
  })
}

export default getRealm
