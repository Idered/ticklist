import Syncano from 'syncano-client'

const syncano = new Syncano(process.env.SYNCANO_INSTANCE_NAME, {
  host: process.env.SYNCANO_SPACE_HOST
})

export default () => syncano
