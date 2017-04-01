import React from 'react'
import Head from '../components/head'
import Page from '../components/page'

const Dashboard = ({issue, handleSubmit}) => (
  <Page>
    <Head>
      <title>Dashboard - Ticklist</title>
    </Head>

    {/* <form onSubmit={handleSubmit}>
      <input {...issue} />
    </form> */}
  </Page>
)

Dashboard.form = {
  formName: 'IssueForm',
  fields: {
    issue: {
      placeholder: 'Issue content...'
    }
  }
}

Dashboard.initialProps = ({
  form: {fields: {issue}, submit},
  services: {issues: {create}}
}) => ({
  issue,
  handleSubmit: (e) => submit(e, create)
})

export default Dashboard
