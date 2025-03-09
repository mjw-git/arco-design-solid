import { Typography } from 'arco-design-solid';
const { Title, Paragraph } = Typography;

const App = () => {
  return (
    <Typography>
      <Title heading={5}>Default</Title>
      <Paragraph>
        A design is a plan or specification for the construction of an object or system or for the
        implementation of an activity or process, or the result of that plan or specification in the
        form of a prototype, product or process. The verb to design expresses the process of
        developing a design. In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
        considered to be a design activity.
      </Paragraph>
      <Title heading={5}>Secondary</Title>
      <Paragraph type="secondary">
        A design is a plan or specification for the construction of an object or system or for the
        implementation of an activity or process, or the result of that plan or specification in the
        form of a prototype, product or process. The verb to design expresses the process of
        developing a design. In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
        considered to be a design activity.
      </Paragraph>
      <Title heading={5}>Spacing default</Title>
      <Paragraph>
        A design is a plan or specification for the construction of an object or system or for the
        implementation of an activity or process, or the result of that plan or specification in the
        form of a prototype, product or process. The verb to design expresses the process of
        developing a design. In some cases, the direct construction of an object without an explicit
        prior plan (such as in craftwork, some engineering, coding, and graphic design) may also be
        considered to be a design activity.
      </Paragraph>
      <Title heading={5}>Spacing close</Title>
      <Paragraph type="secondary" spacing="close">
        A design is a plan or specification for the construction of an object or system or for the
        implementation of an activity or process, or the result of that plan or specification in the
        form of a prototype, product or process. The verb to design expresses the process of
        developing a design.
      </Paragraph>
    </Typography>
  );
};

export default App;
