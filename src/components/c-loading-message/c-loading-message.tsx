export function CLoadingMessage() {
  return (
    <article className="message is-primary">
      <div className="message-header">
        <p>Loading</p>
      </div>
      <div className="message-body p-5">
        <progress className="progress is-large is-info" max="100">
          20%
        </progress>
      </div>
    </article>
  );
}
