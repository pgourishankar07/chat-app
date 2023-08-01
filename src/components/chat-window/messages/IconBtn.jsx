import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite';

const ConditionalBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};

export default function IconBtn({
  isVisible,
  iconName,
  tooltip,
  badgeContent,
  onClick,
  ...props
}) {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <ConditionalBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayShow={0}
          delayHide={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            size="xs"
            onClick={onClick}
            {...props}
            circle
            icon={<Icon icon={iconName} />}
          />
        </Whisper>
      </ConditionalBadge>
    </div>
  );
}
