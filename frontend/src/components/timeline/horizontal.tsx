import cx from "classnames";

const HorizontalTimeline = ({
  events,
  step,
}: {
  events: string[];
  step: number;
}) => {
  return (
    <div className="container">
      <div className="row text-center justify-content-center mb-5">
        <div className="col-xl-6 col-lg-8">
          <h2 style={{ fontSize: "20px", fontWeight: "700" }}>
            Proses tahapan usulan program studi
          </h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="timeline-steps aos-init aos-animate"
            data-aos="fade-up"
          >
            {events.map((event, idx) => (
              <div
                key={idx}
                className={cx(
                  "timeline-step",
                  step >= idx ? "active-before" : "",
                  step + 1 >= idx ? "active-after" : ""
                )}
              >
                <div
                  className="timeline-content"
                  data-toggle="popover"
                  data-trigger="hover"
                  data-placement="top"
                >
                  <div
                    className={cx("inner-circle", step >= idx ? "active" : "")}
                  >
                    {idx + 1}
                  </div>
                  <p
                    className="text-muted mb-0 mb-lg-0"
                    style={{ fontSize: "14px" }}
                  >
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTimeline;
