import Head from '../../components/head'
import Page from '../../components/page'

const Login = ({
  services: {
    user: {login}
  },
  services,
  stores: {
    messages,
    pending,
    login: {authorization}
  },
  form: {fields, submit}
}) => (
  <Page>
    <Head>
      <title>Ticklist - Swift concise team management</title>
    </Head>

    <div className='content'>
      <h1>Ticklist</h1>
      <h2>
        <b>Swift</b> concise team <b>management</b>.<br />
        Resolve your <b>team problems first</b>.
      </h2>

      <form
        className='form'
        onSubmit={e => submit(e, login)}
        >
        {authorization ? (
          <div>
            We sent an email to <b>{authorization.email}</b>. <br />
            Please log in to your email, verify that the provided security code matches <b>{authorization.code}</b> and follow the link.
          </div>
        ) : (
          <input
            {...fields.email}
            className={messages.has('user.login') && 'is-invalid'}
            disabled={pending.has('user.login')}
            />
        )}

        {messages.has('user.login') && (
          <p className='error'>{messages.get('user.login')}</p>
        )}
      </form>
    </div>

    <style jsx>{`
      .content {
        text-align: center;
        margin-top: 140px;
      }

      .form {
        margin-top: 70px;
        max-width: 480px;
        margin-left: auto;
        margin-right: auto;
      }

      h1 {
        font-weight: 600;
        font-size: 32px;
        color: #2E3440;
      }

      h2 {
        color: #2E3440;
        font-size: 24px;
        font-weight: 300;
        margin-top: 15px;
      }

      input {
        border: none;
        padding: 10px 10px;
        text-align: center;
        border-bottom: 2px solid #E5E9F0;
        transition: border-bottom-color .25s;
      }

      input.is-invalid {
        border-bottom-color: #BF616A;
      }

      input:focus {
        outline: 0;
        border-bottom-color: #88C0D0;
      }

      .error {
        margin-top: 10px;
        color: #BF616A;
      }
    `}</style>
  </Page>
)

Login.form = {
  formName: 'LoginForm',
  fields: {
    email: {
      name: 'email',
      placeholder: 'you@email.com'
    }
  }
}

export default Login
