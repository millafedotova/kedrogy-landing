import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

function HomepageHeader() {
  return (
    <header className="hero hero--primary" style={{padding: '6rem 0'}}>
      <div className="container">
        <h1 className="hero__title" style={{fontSize: '4rem'}}>Kedrogy</h1>
        <p className="hero__subtitle" style={{fontSize: '1.5rem', maxWidth: 700, marginLeft: 0, marginRight: 'auto', marginTop: '1.5rem', marginBottom: '2rem', textAlign: 'left'}}>
          An ML operations platform that bridges data annotation, model training,
          and model serving into a single web application
        </p>
        <div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function HeroScreenshot() {
  return (
    <section className="showcase-section">
      <div className="container">
        <div className="showcase-browser">
          <div className="browser-bar">
            <span className="browser-dot" style={{background: '#ff5f57'}} />
            <span className="browser-dot" style={{background: '#febc2e'}} />
            <span className="browser-dot" style={{background: '#28c840'}} />
          </div>
          <img
            src="/img/kedrogy-gif.gif"
            alt="Kedrogy in action"
            className="showcase-img"
          />
        </div>
      </div>
    </section>
  );
}

function FeatureSection({title, description, imgSrc, imgAlt, reverse}) {
  return (
    <section className="feature-section">
      <div className="container">
        <div className={`feature-row ${reverse ? 'feature-row--reverse' : ''}`}>
          <div className="feature-text">
            <h2 className="feature-title">{title}</h2>
            <p className="feature-description">{description}</p>
          </div>
          <div className="feature-img-wrap">
            <div className="showcase-browser showcase-browser--small">
              <div className="browser-bar">
                <span className="browser-dot" style={{background: '#ff5f57'}} />
                <span className="browser-dot" style={{background: '#febc2e'}} />
                <span className="browser-dot" style={{background: '#28c840'}} />
              </div>
              <img src={imgSrc} alt={imgAlt} className="showcase-img" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {num: '1', title: 'Create a dataset', text: 'Define a dataset backed by a Kedro pipeline and configure Prodigy annotation recipes'},
    {num: '2', title: 'Label your data', text: 'Kedrogy deploys a Prodigy instance to Kubernetes so annotators can label examples'},
    {num: '3', title: 'Train a model', text: 'Launch a training job on Kubernetes using the annotated data, with live log streaming'},
    {num: '4', title: 'Serve and predict', text: 'Deploy the trained model as a Kubernetes service and run predictions via the REST API'},
  ];

  return (
    <section className="steps-section">
      <div className="container">
        <h2 className="section-heading">How It Works</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.num} className="step-card">
              <div className="step-num">{step.num}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechStackSection() {
  const stack = [
    {name: 'Django', role: 'Web backend and REST API', url: 'https://www.djangoproject.com/'},
    {name: 'React', role: 'Single-page application frontend', url: 'https://react.dev/'},
    {name: 'Kedro', role: 'ML data pipelines', url: 'https://kedro.org/'},
    {name: 'Prodigy', role: 'Data annotation and labeling', url: 'https://prodi.gy/'},
    {name: 'Kubernetes', role: 'Container orchestration', url: 'https://kubernetes.io/'},
    {name: 'PostgreSQL', role: 'Database', url: 'https://www.postgresql.org/'},
  ];

  return (
    <section className="tech-section">
      <div className="container">
        <h2 className="section-heading">Built With</h2>
        <div className="tech-grid">
          {stack.map((tech) => (
            <a key={tech.name} className="tech-card" href={tech.url} target="_blank" rel="noopener noreferrer">
              <h3 className="tech-name">{tech.name}</h3>
              <p className="tech-role">{tech.role}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function BottomCTA() {
  return (
    <section className="cta-section">
      <div className="container" style={{textAlign: 'center'}}>
        <h2 className="section-heading">Ready to get started?</h2>
        <p style={{fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.85}}>
          Set up Kedrogy in minutes and start managing your ML workflows.
        </p>
        <Link className="button button--primary button--lg" to="/docs/intro">
          Read the Docs
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="ML Operations Platform"
      description="Kedrogy bridges Prodigy, Kedro, Django, and Kubernetes into a unified ML operations platform">
      <HomepageHeader />
      <main>
        <HeroScreenshot />

        <FeatureSection
          title="Dataset Management"
          description="Create and manage ML datasets through an intuitive web interface. Configure Kedro pipelines, Prodigy annotation recipes, and data sources all in one place. Track labeling status across your entire project."
          imgSrc="/img/models-datasets.png"
          imgAlt="Datasets and models overview"
        />

        <FeatureSection
          title="Create & Configure"
          description="Spin up new datasets and models in seconds. Specify your Docker image, Kedro pipeline, data table, and Prodigy recipe options through a clean form interface."
          imgSrc="/img/create-new.png"
          imgAlt="Create a new dataset"
          reverse
        />

        <FeatureSection
          title="Dataset Details"
          description="Inspect every detail of your dataset configuration. See the Docker image, working directory, pipeline, recipe options, and labeling status at a glance. Launch annotation with one click."
          imgSrc="/img/dataset-info.png"
          imgAlt="Dataset detail view"
        />

        <FeatureSection
          title="Model Training & Serving"
          description="Train models directly from annotated data and deploy them to Kubernetes with one click. Monitor training status, serve models, and run live predictions through the built-in text classification interface."
          imgSrc="/img/model-details.png"
          imgAlt="Model details and prediction"
          reverse
        />

        <HowItWorks />
        <TechStackSection />
        <BottomCTA />
      </main>
    </Layout>
  );
}
