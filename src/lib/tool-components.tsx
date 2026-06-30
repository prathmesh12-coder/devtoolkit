"use client";

import type { ComponentType } from "react";

import JsonFormatter from "@/utilities/format/json-formatter";
import YamlJson from "@/utilities/format/yaml-json";
import JsonCsv from "@/utilities/format/json-csv";
import XmlFormatter from "@/utilities/format/xml-formatter";
import DotenvJson from "@/utilities/format/dotenv-json";

import Base64Tool from "@/utilities/encode/base64";
import UrlTool from "@/utilities/encode/url";
import JwtDecoder from "@/utilities/encode/jwt-decoder";
import HtmlEntities from "@/utilities/encode/html-entities";
import HexTool from "@/utilities/encode/hex";
import NumberBase from "@/utilities/encode/number-base";

import HashGenerator from "@/utilities/crypto/hash";
import HmacGenerator from "@/utilities/crypto/hmac";
import UuidGenerator from "@/utilities/crypto/uuid";
import PasswordGenerator from "@/utilities/crypto/password";
import K8sSecret from "@/utilities/crypto/k8s-secret";

import TextDiff from "@/utilities/text/diff";
import RegexTester from "@/utilities/text/regex";
import CaseConverter from "@/utilities/text/case-converter";
import LineTools from "@/utilities/text/line-tools";
import Slugify from "@/utilities/text/slugify";
import TextCounter from "@/utilities/text/text-counter";
import StringEscape from "@/utilities/text/string-escape";
import LoremIpsum from "@/utilities/text/lorem-ipsum";

import TimestampConverter from "@/utilities/time/timestamp";
import CronExplainer from "@/utilities/time/cron";
import TimezoneConverter from "@/utilities/time/timezone";
import DurationConverter from "@/utilities/time/duration";

import CidrCalculator from "@/utilities/network/cidr";
import UrlParser from "@/utilities/network/url-parser";
import HttpStatus from "@/utilities/network/http-status";
import ChmodCalculator from "@/utilities/network/chmod";
import UserAgentParser from "@/utilities/network/user-agent";

import KubectlBuilder from "@/utilities/devops/kubectl-builder";
import DockerToCompose from "@/utilities/devops/docker-to-compose";
import SqlFormatter from "@/utilities/devops/sql-formatter";
import ByteConverter from "@/utilities/devops/byte-converter";
import CurlBuilder from "@/utilities/devops/curl-builder";
import GitignoreGenerator from "@/utilities/devops/gitignore";

export const toolComponents: Record<string, ComponentType> = {
  "json-formatter": JsonFormatter,
  "yaml-json": YamlJson,
  "json-csv": JsonCsv,
  "xml-formatter": XmlFormatter,
  "dotenv-json": DotenvJson,
  base64: Base64Tool,
  "url-encode": UrlTool,
  "jwt-decoder": JwtDecoder,
  "html-entities": HtmlEntities,
  "hex-text": HexTool,
  "number-base": NumberBase,
  "hash-generator": HashGenerator,
  "hmac-generator": HmacGenerator,
  "uuid-generator": UuidGenerator,
  "password-generator": PasswordGenerator,
  "k8s-secret": K8sSecret,
  "text-diff": TextDiff,
  "regex-tester": RegexTester,
  "case-converter": CaseConverter,
  "line-tools": LineTools,
  slugify: Slugify,
  "text-counter": TextCounter,
  "string-escape": StringEscape,
  "lorem-ipsum": LoremIpsum,
  "unix-timestamp": TimestampConverter,
  "cron-explainer": CronExplainer,
  "timezone-converter": TimezoneConverter,
  "duration-converter": DurationConverter,
  "cidr-calculator": CidrCalculator,
  "url-parser": UrlParser,
  "http-status": HttpStatus,
  "chmod-calculator": ChmodCalculator,
  "user-agent-parser": UserAgentParser,
  "kubectl-builder": KubectlBuilder,
  "docker-run-to-compose": DockerToCompose,
  "sql-formatter": SqlFormatter,
  "byte-converter": ByteConverter,
  "curl-builder": CurlBuilder,
  "gitignore-generator": GitignoreGenerator,
};
