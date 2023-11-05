
import { Card } from 'react-bootstrap';
import {GoodResponse} from '../GoodResponse';
import {BadResponse} from '../BadResponse';


export const Response = ({ success, fail, successText, failText }) => {
  return (
    (success || fail) && (
      <Card.Body className="mb-0 pb-0">
        {success && <GoodResponse text={successText} />}
        {fail && <BadResponse text={failText} />}
      </Card.Body>
    )
  );
};
