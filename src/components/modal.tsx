import { ModalButton } from '../components/modalButton.js';
import { Devvit } from '@devvit/public-api';

type ModalProps = {
  answer: string;
  onClose: () => void;
  onRetry: () => void;
  onPost: () => void;
};

const Modal = ({ answer, onClose, onRetry, onPost }: ModalProps) => (
  <vstack height="100%" width="100%" alignment="center middle" backgroundColor="rgba(0,0,0,0.4)">
    <vstack height="50%" width="80%" backgroundColor="#56CCF2" alignment="center" padding="medium" cornerRadius='small'>
      <vstack height="33%" width="100%">
        <text size="xlarge" wrap alignment="center" weight="bold" color='white'>
          {answer === 'wrong' ? '😔 Oh No!! Your answer was wrong.' : '🎉 Yay!! Your answer was right.'}
        </text>
      </vstack>
      <vstack height="33%" width="100%" alignment="center">
        <hstack>
          <text size="xxlarge" weight="bold" color='white'>Score</text>
          <text size="xxlarge" weight="bold" color={answer === 'wrong' ? 'yellow' : 'green'}>
            {answer === 'wrong' ? '+0' : '+1'}
          </text>
        </hstack>
        <text wrap alignment="center" weight="bold" color='white'>
          {answer === 'wrong' ? 'Give it another shot' : 'An appreciation post is being posted!! :D'}
        </text>
      </vstack>
      <hstack height="33%" width="100%" alignment="bottom center">
        
        
        {answer !== 'wrong' ?
        <ModalButton label='Menu' background='#D93A00' textColor='white' onClick={onPost}/>:
<ModalButton label='Menu' background='white' textColor='black' onClick={onClose}/>
        }
      </hstack>
    </vstack>
  </vstack>
);

export default Modal;
