import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserName } from '@frontend/shared/hooks/user/getUserForm';
import { getFormBySlug } from '@frontend/shared/hooks/form';
import Userlists from '../response/userlists_2';

export default function Username() {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFormBySlug('spotify');
        setFormData(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function inside useEffect

    // Add any cleanup logic if needed
  }, []);
  return (
    <div>
      <Userlists form={formData} />
    </div>
  );
}

// export default function Username() {
//     const responses = [
//         { createdBy: { _id: 1, firstName: 'Unauthenticated', lastName: '' } },
//       { createdBy: { _id: 2, firstName: 'Gaurav', lastName: 'Singh' } },
//       { createdBy: { _id: 3, firstName: 'Gaurav', lastName: 'Singh' } },
//       { createdBy: { _id: 4, firstName: 'Unauthenticated', lastName: '' } },
//       { createdBy: { _id: 5, firstName: 'Sumithra', lastName: 'Devi' } },
//       { createdBy: { _id: 6, firstName: 'Rohan', lastName: 'R' } },
//       { createdBy: { _id: 7, firstName: 'Rohan', lastName: 'R' } },
//       { createdBy: { _id: 8, firstName: 'Arjav', lastName: 'Sethi' } },
//       { createdBy: { _id: 9, firstName: 'Arjav', lastName: 'Sethi' } },
//       { createdBy: { _id: 10, firstName: 'Arjav', lastName: 'Sethi' } },
//     ];

//     return (
//       <div>
//         <h2>Usernames List</h2>
//         <ul>
//           {responses.map((response) => (
//             <li key={response.createdBy._id}>
//               <Link href={`/form/users/response/${response.createdBy._id}`}>
//                 <a>
//                   {`${response.createdBy.firstName} ${response.createdBy.lastName}`}
//                 </a>
//               </Link>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
