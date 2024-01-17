import React from 'react';
import SocialSignIn from './SocialSignIn';
import { DisplayForm } from '../form2/DisplayForm';

export default function SignUpForm() {
  // const slug = 'users';
  // const { data, error } = useGetFormBySlug(slug);
  // const [form, setForm] = useState<any[]>([]);

  // useEffect(() => {
  //   const tempForm = {
  //     ...data?.getFormBySlug,
  //     fields: data?.getFormBySlug?.fields?.filter((e) => !e?.label.toUpperCase().includes('ROLE')),
  //   };
  //   setForm(tempForm);
  // }, [data]);

  return (
    <>
      {/* <form onSubmit={formik.handleSubmit} data-testid="signup-form">
        <InputGroup>
          <TextField
            fullWidth
            label="Name*"
            variant="outlined"
            type="text"
            name="name"
            size="small"
            disabled={formik.isSubmitting}
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </InputGroup>
        <InputGroup>
          <TextField
            fullWidth
            label="Email*"
            name="email"
            variant="outlined"
            type="text"
            size="small"
            disabled={formik.isSubmitting}
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </InputGroup>
        <InputGroup>
          <PasswordInput
            fullWidth
            label="Password*"
            name="password"
            variant="outlined"
            size="small"
            disabled={formik.isSubmitting}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            labelWidth={80}
          />
        </InputGroup>
        <InputGroup>
          <LoadingButton
            fullWidth
            data-testid="signup-button"
            type="submit"
            loading={formik.isSubmitting}
          >
            Sign Up
          </LoadingButton>
        </InputGroup>
      </form> */}
      <>
        <DisplayForm
          slug="users"
          settings={{ widgetType: 'form', whoCanSubmit: 'all' }}
          modifyForm={(form) => {
            const newForm = { ...form };
            newForm.fields = newForm?.fields?.map((field) => {
              const newField = { ...field };
              if (newField?.label?.toLowerCase() === 'roles') {
                newField.options.hidden = true;
              }
              return newField;
            });
            return newForm;
          }}
        />
        <SocialSignIn signIn={false} />
      </>
    </>
  );
}
