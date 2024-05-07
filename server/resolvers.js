import { GraphQLError } from "graphql";

import {
  countJobs,
  createJob,
  deleteJob,
  getJob,
  getJobs,
  getJobsByCompany,
  updateJob,
} from "./db/jobs.js";
import { getCompany } from "./db/companies.js";

export const resolvers = {
  Query: {
    company: async (_root, { companyId }) => {
      const company = await getCompany(companyId);

      if (!company) {
        throw notFoundError("No company with id found. Id is " + companyId);
      }

      return company;
    },
    job: async (_root, { id }) => {
      const job = await getJob(id);

      if (!job) {
        throw notFoundError("No Job found with id: ", id);
      }

      return job;
    },
    jobs: async (_root, { limit, offset }) => {
      const items = await getJobs(limit, offset);
      const totalCount = await countJobs();
      return { items, totalCount };
    },
  },

  Mutation: {
    createJob: (_root, { input: { title, description } }, { user }) => {
      if (!user) {
        throw unauthorizedError("Missing auth");
      }
      return createJob({ companyId: user.companyId, title, description });
    },
    updateJob: async (
      _root,
      { input: { id, title, description } },
      { user },
    ) => {
      if (!user) {
        throw unauthorizedError("Please login first!");
      }

      const job = await updateJob(id, user.companyId);

      if (!job) {
        throw notFoundError("No Job with id: ", id);
      }

      return job;
    },

    deleteJob: async (_root, { id }, { user }) => {
      if (!user) {
        throw unauthorizedError("Auth is missing");
      }

      const job = await deleteJob(id, user.companyId);

      if (!job) {
        throw notFoundError("No Job with id: ", id);
      }
      return job;
    },
  },
  Company: {
    jobs: (company) => getJobsByCompany(company.id),
  },

  Job: {
    company: (job, _args, { companyLoader }) =>
      companyLoader.load(job.companyId),
    date: (job) => job.createdAt.slice(0, "yyyy-mm-dd".length),
  },
};

function notFoundError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: "NOT_FOUND",
    },
  });
}

function unauthorizedError(message) {
  return new GraphQLError(message, {
    extensions: {
      code: "UNAUTHORIZED",
    },
  });
}
