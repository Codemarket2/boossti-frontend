import { useRouter } from 'next/router';
import DesignEditor from '../../../src/components/form2/DesignEditor';
import AuthRequired from '../../../src/components/common/AuthRequired';

export default function design() {
  const router = useRouter();
  const { _id } = router.query;
  return <AuthRequired>{_id && <DesignEditor _id={_id?.toString()} />}</AuthRequired>;
}
