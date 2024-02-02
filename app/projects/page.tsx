import type { Metadata } from "next";
import {
    ArrowSmallRightIcon,
    CodeBracketIcon,
} from "@heroicons/react/24/solid";
import projects from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
const day = require("dayjs");

export const metadata: Metadata = {
    title: "Projects",
    description: "Some collection of my past works.",
};

export default async function Blog() {
    const filteredProject = projects.sort(
        (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    );
    return (
        <section id="projects-content">
            <h1 className="mt-4 pt-3 text-4xl md:mt-11 md:text-6xl">
                Projects
            </h1>
            <p className="mt-2">Some collection of my past works.</p>
            {filteredProject.length > 0 ? (
                <div className="flex flex-col space-y-6 py-4">
                    {filteredProject.map((project, i) => (
                        <div
                            className="flex flex-col rounded-md border-2 border-dashed border-gray-200 md:h-[312px] md:flex-row dark:border-gray-800"
                            key={i}
                        >
                            <Image
                                className="rounded md:w-1/2"
                                width="555"
                                height="312"
                                src={project.image}
                                alt={project.title}
                                placeholder="blur"
                                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNMqwcAAVEA58giG6IAAAAASUVORK5CYII="
                            />
                            <div className="flex max-w-[555px] flex-col justify-between p-4 md:w-1/2 md:p-6">
                                <div>
                                    <h1 className="line-clamp-2 font-doodle">
                                        {project.title}
                                    </h1>
                                    <p className="py-2 text-xs text-gray-700 md:text-sm dark:text-gray-300">
                                        Created at{" "}
                                        {day(project.createdAt).format(
                                            "MMMM YYYY"
                                        )}
                                    </p>
                                    <p className="line-clamp-3 text-justify text-sm md:text-base">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap space-x-2 pt-3">
                                        {project.technology?.map(
                                            (tech, idx) => (
                                                <div
                                                    className={`${
                                                        tech.color ||
                                                        "bg-gray-300 dark:bg-gray-700"
                                                    } rounded-sm px-1 py-0.5 text-[11px] font-semibold uppercase md:text-xs`}
                                                    key={idx}
                                                >
                                                    {tech.url ? (
                                                        <Link
                                                            target="_blank"
                                                            href={tech.url}
                                                        >
                                                            {tech.name}
                                                        </Link>
                                                    ) : (
                                                        tech.name
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div className="mt-4 flex space-x-4 font-bold md:text-lg">
                                    {project.url && (
                                        <>
                                            <Link
                                                target="_blank"
                                                className="inline-flex hover:underline"
                                                href={project.url}
                                            >
                                                <ArrowSmallRightIcon className="w-4 md:w-5" />
                                                <p className="pl-2">
                                                    Visit Project
                                                </p>
                                            </Link>
                                        </>
                                    )}
                                    {project.source && (
                                        <>
                                            <Link
                                                target="_blank"
                                                className="inline-flex hover:underline"
                                                href={project.source}
                                            >
                                                <CodeBracketIcon className="w-4 md:w-5" />
                                                <p className="pl-2">
                                                    Source Code
                                                </p>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No project.</p>
            )}
        </section>
    );
}
