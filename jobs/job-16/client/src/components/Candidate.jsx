import './Candidate.scss';

const Candidate = ({ candidate }) => {

    const firstJobs = candidate.jobs.slice(0, 2);

    return (
        <div className="candidate">
            <div className="title">
                {candidate.title}
            </div>
            <div className="details">
                <div className="image"></div>
                <div className="job-details">
                    {firstJobs.map((job, i) =>
                        <div className="job" key={i}>
                            <div className="job-title">
                                Worked as: <span className="label">{job.job_title}</span>
                            </div>
                            <div className="job-times">
                                from {job.start} to {job.end}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Candidate;