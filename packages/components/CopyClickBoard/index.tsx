import { mergeProps, splitProps } from 'solid-js';

import copy from 'copy-to-clipboard';
import { Copy } from 'arco-solid-icon';

import { CopyClickBoardProps } from './interface';
import FlexBox from '../FlexBox';
import message from '../Message';

const CopyClickBoard: CopyClickBoardProps = props => {
  const mergedProps = mergeProps({ showSuccessMessage: true }, props);
  const [local, rest] = splitProps(mergedProps, ['copyText', 'onSuccess', 'showSuccessMessage']);
  return (
    <div {...rest}>
      <FlexBox>
        <span>{local.copyText}</span>
        <Copy
          onClick={() => {
            const copySuccess = copy(local.copyText);
            if (copySuccess) {
              local.showSuccessMessage && message.success('复制成功!');
              local.onSuccess?.();
            }
          }}
          class="sld-copy-icon"
        />
      </FlexBox>
    </div>
  );
};
export default CopyClickBoard;
CopyClickBoard.$copy = copy;
